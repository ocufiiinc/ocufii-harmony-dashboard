import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAlertNotes, addAlertNote } from "../../api/DashboardApi";
import { useUser } from "../../context/UserContext";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  AlertInfo,
  AlertName,
  AlertDateTime,
  AlertDate,
  AlertTime,
  StatusBadge,
  NotesSection,
  NotesLabel,
  NotesList,
  NoteItem,
  NoteHeader,
  NoteAuthorInfo,
  NoteAuthorName,
  NoteTimestamp,
  NoteText,
  NoteInputContainer,
  NoteTextarea,
  ActionButtons,
  AcknowledgeButton,
  ResolvedButton,
} from "./AlertActionModal.styled";
import moment from "moment";
import { formatDate, formatTime } from "../../utility/TimeFormat";

const AlertActionModal = ({ alert, onClose, onRemoveAlert }) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [noteText, setNoteText] = useState("");

  // Fetch alert notes
  const { data: alertNotesData, isLoading } = useQuery({
    queryKey: ["alertNotes", alert?.id],
    queryFn: () => getAlertNotes(user?.email, alert?.id),
    enabled: !!alert && !!user?.email,
  });

  // Mutation for adding notes
  const addNoteMutation = useMutation({
    mutationFn: addAlertNote,
    onSuccess: (data, variables) => {
      // Refetch notes to show the new one
      queryClient.invalidateQueries(["alertNotes", alert?.id]);
      setNoteText("");

      // If status is Resolved (3), remove from list and close modal
      if (variables.newStatus === 3) {
        onRemoveAlert?.();
        onClose();
      } else {
        // Just close modal for Acknowledge
        onClose();
      }
    },
  });

  const handleAcknowledge = () => {
    if (!noteText.trim()) {
      return;
    }
    addNoteMutation.mutate({
      notificationId: alert.id,
      email: user?.email,
      authorName: user?.name || user?.email,
      noteText: noteText.trim(),
      newStatus: 1, // Acknowledged
    });
  };

  const handleResolved = () => {
    if (!noteText.trim()) {
      return;
    }
    addNoteMutation.mutate({
      notificationId: alert.id,
      email: user?.email,
      authorName: user?.name || user?.email,
      noteText: noteText.trim(),
      newStatus: 3, // Resolved
    });
  };

  if (!alert) return null;

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Open";
      case 1:
        return "Acknowledged";
      case 2:
        return "In Progress";
      case 3:
        return "Resolved";
      default:
        return "";
    }
  };

  const canAddNotes = alertNotesData?.canAddNotes ?? true;
  const notes = alertNotesData?.notes || [];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <span>Alert Action</span>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <AlertInfo>
          <AlertName>{alert.title || "Alert"}</AlertName>
          <AlertDateTime>
            <AlertDate>
              {formatDate(alert.timestamp || alert.duration)}
            </AlertDate>
            <AlertTime>
              {formatTime(alert.timestamp || alert.duration)}
            </AlertTime>
          </AlertDateTime>
        </AlertInfo>

        <NotesSection>
          <NotesLabel>Notes:</NotesLabel>

          {isLoading ? (
            <p style={{ color: "#999", fontSize: "14px" }}>Loading notes...</p>
          ) : notes.length > 0 ? (
            <NotesList>
              {notes.map((note) => (
                <NoteItem key={note.noteId}>
                  <NoteHeader>
                    <NoteAuthorInfo>
                      <NoteAuthorName>{note.authorName}</NoteAuthorName>
                      <NoteTimestamp>
                        {formatDate(note.timestamp)}{" "}
                        {formatTime(note.timestamp)}
                      </NoteTimestamp>
                    </NoteAuthorInfo>
                    {note.statusText && (
                      <StatusBadge status={note.statusAtTime}>
                        {note.statusText}
                      </StatusBadge>
                    )}
                  </NoteHeader>
                  <NoteText>{note.noteText}</NoteText>
                </NoteItem>
              ))}
            </NotesList>
          ) : null}

          {canAddNotes && (
            <NoteInputContainer>
              <NoteTextarea
                placeholder="Enter notes about this alert"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
            </NoteInputContainer>
          )}
        </NotesSection>

        {canAddNotes && (
          <ActionButtons>
            <AcknowledgeButton
              onClick={handleAcknowledge}
              disabled={!noteText.trim() || addNoteMutation.isLoading}
            >
              {addNoteMutation.isLoading ? "Processing..." : "Acknowledge"}
            </AcknowledgeButton>
            <ResolvedButton
              onClick={handleResolved}
              disabled={!noteText.trim() || addNoteMutation.isLoading}
            >
              {addNoteMutation.isLoading ? "Processing..." : "Resolved"}
            </ResolvedButton>
          </ActionButtons>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AlertActionModal;

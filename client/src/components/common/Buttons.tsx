import React from "react";
import { Button, Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";

interface ButtonProps {
  entityId?: number;
  basePath?: string;
  onDelete?: (id: number) => void;
  onArchive?: (id: number) => void;
}

// New Save button that can be reused across entities like books, users, rentals
export const SaveButton: React.FC<{ onSave: () => void }> = ({ onSave }) => (
  <Button
    type="primary" // Green button color
    style={{ backgroundColor: "green", borderColor: "green" }}
    onClick={onSave}
  >
    Save
  </Button>
);

// Dugme za prikaz detalja
export const ViewButton: React.FC<ButtonProps> = ({ entityId, basePath }) => (
  <Link to={`/${basePath}/${entityId}`}>
    <Button type="default">View</Button>
  </Link>
);

// Dugme za uređivanje
export const EditButton: React.FC<ButtonProps> = ({ entityId, basePath }) => (
  <Link to={`/${basePath}/edit/${entityId}`}>
    <Button type="primary">Edit</Button>
  </Link>
);

// Dugme za brisanje sa potvrdom
export const DeleteButton: React.FC<ButtonProps> = ({ entityId, onDelete }) => (
  <Popconfirm
    title="Are you sure you want to delete this item?"
    onConfirm={() => onDelete && entityId && onDelete(entityId)}
    okText="Yes"
    cancelText="No"
  >
    <Button type="primary" danger>
      Delete
    </Button>
  </Popconfirm>
);

// Dugme za arhiviranje sa potvrdom
export const ArchiveButton: React.FC<ButtonProps> = ({
  entityId,
  onArchive,
}) => (
  <Popconfirm
    title="Are you sure you want to archive this item?"
    onConfirm={() => onArchive && entityId && onArchive(entityId)}
    okText="Yes"
    cancelText="No"
  >
    <Button type="primary" ghost>
      Archive
    </Button>
  </Popconfirm>
);

// Dugme za dodavanje novog entiteta
export const AddNewButton: React.FC<{ basePath: string; label: string }> = ({
  basePath,
  label,
}) => (
  <Link to={`/${basePath}/add`}>
    <Button type="primary">{label}</Button>
  </Link>
);

// Dugme za prikaz arhiviranih stavki
export const ArchivedButton: React.FC<{ basePath: string }> = ({
  basePath,
}) => (
  <Link to={`/${basePath}/archived-rentals`}>
    <Button type="default">View Archived</Button>
  </Link>
);

// Dugme za povratak
export const GoBackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button type="default" onClick={() => navigate(-1)}>
      Go Back
    </Button>
  );
};

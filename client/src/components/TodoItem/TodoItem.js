import React, { useState, useRef } from 'react';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';
import { useUpdateTodo } from '../../hooks/useUpdateTodo';
import { useToggleTodo } from '../../hooks/useToggleTodo';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../styles/TodoItem.scss';

export default function TodoItem({ todo }) {
  const { _id, data, done } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(data);

  const { removeTodo } = useDeleteTodo();
  const { updateTodoData } = useUpdateTodo();
  const { toggleTodoStatus } = useToggleTodo();

  const editButtonClicked = useRef(false);

  const handleUpdate = async () => {
    await updateTodoData(_id, editedContent);
    if (!editButtonClicked.current) {
      setIsEditing(false);
    }
    editButtonClicked.current = false;
  };

  return (
    <li className="TodoItem">
      <input
        type="checkbox"
        checked={done}
        disabled={isEditing}
        onChange={() => toggleTodoStatus(_id)}
        aria-label={done ? 'Mark this task as incomplete' : 'Mark this task as complete'}
      />

      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
          />
          <button className="edit-button" onClick={handleUpdate}>
            Save
          </button>
        </div>
      ) : (
        <div className="content-container">
          <p className={done ? 'strikethrough' : ''}>{data}</p>
          <button
            className="edit-button"
            onClick={() => {
              editButtonClicked.current = true;
              setIsEditing(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      )}

      <button className="delete-button" onClick={() => removeTodo(_id)}>
        Delete
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

import React, { useState } from 'react';
import styles from './styles.module.scss';
import Header from '../../components/Header/Header';

const name = "Test"
const email = "teste@gmail.com"
const imageUrl = "https://"

const Profile: React.FC = () => {
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPassword, setEditedPassword] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState(imageUrl);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log('Salvando alterações:', editedName, editedEmail, editedImageUrl);
    setIsEditing(false);
  };

  return (
    <>
    <div className={styles.profileContainer}>
    <div className={styles.profile}>
      <h2>Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={editedPassword}
              onChange={(e) => setEditedPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">Profile Image URL:</label>
            <input
              type="url"
              id="imageUrl"
              value={editedImageUrl}
              onChange={(e) => setEditedImageUrl(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className={styles.profileInfo}>
          <p><span className={styles.label}>Name:</span> {name}</p>
          <p><span className={styles.label}>Email:</span> {email}</p>
          <p><span className={styles.label}>Profile Image URL:</span> {imageUrl}</p>
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
        </div>
      )}
    </div>




    </div>
    
    </>
  );
};

export default Profile;

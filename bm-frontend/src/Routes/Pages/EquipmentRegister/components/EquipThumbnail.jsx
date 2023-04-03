import { LocalSeeOutlined, SystemUpdateAlt } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './equip-thumbnail.css';

const EquipThumbnail = ({ img, setImg }) => {
  /* Router */
  /* State */
  const [preview, setPreview] = useState(null);
  /* Functions */
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      const file = acceptedFiles[0];
      setImg(file);
      const p = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setPreview(p.preview);
    },
    [setImg]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  /* Hooks */
  useEffect(() => {
    if (img) {
      return;
    }
    setPreview(null);
  }, [img]);

  /* Render */

  return (
    <div {...getRootProps()} className="equip-thumbnail-wrapper">
      {preview ? (
        <img src={preview} alt="thumbnail" className="thumbnail" />
      ) : (
        <>
          <input {...getInputProps()} className="thumbnail" />
          {isDragActive ? (
            <p>
              <SystemUpdateAlt />
            </p>
          ) : (
            <p className="normal">
              <LocalSeeOutlined fontSize="large" color="#000" />
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default EquipThumbnail;

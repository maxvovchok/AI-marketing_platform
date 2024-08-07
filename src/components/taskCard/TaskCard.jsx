import React, { useState } from 'react';
import Notiflix from 'notiflix';
import { Link, useLocation } from 'react-router-dom';
import { generateImages } from 'services/requests';
import { CastomSelect } from 'components/castomSelect/CastomSelect';
import { ImageLayers } from 'components/imageLayers/ImageLayers';
import styles from './TaskCard.module.css';

export const TaskCard = ({ card }) => {
  const [images, setImages] = useState(Array(card.amount).fill([]));
  const [dimension, setDimension] = useState('');
  const [style, setStyle] = useState('');
  const [manualPrompts, setManualPrompts] = useState('');
  const [genPerRef, setGenPerRef] = useState(0);
  const [flow, setFlow] = useState('');
  const [openSelect, setOpenSelect] = useState(null);

  const location = useLocation();

  const handleCreateImages = async e => {
    e.preventDefault();

    if (
      !images.flat().length ||
      !dimension ||
      !style ||
      !flow ||
      genPerRef === 0
    ) {
      Notiflix.Notify.failure('❌ Please fill in all required fields.');
      return;
    }

    const newImg = {
      images: images.flat(),
      dimension,
      style,
      manual_prompts: manualPrompts,
      gen_per_ref: genPerRef,
      flow,
    };

    try {
      console.log(newImg);

      const data = await generateImages(newImg);
      Notiflix.Notify.success(`${data.message}`);
    } catch (error) {
      Notiflix.Notify.failure('❌ Sorry');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{card.task_name}</h1>
      <Link to={location.state?.from || '/'} style={{ textDecoration: 'none' }}>
        <button className={styles.back}>X</button>
      </Link>
      <CastomSelect
        name={'Text'}
        item={card.text_layers[0]}
        openSelect={openSelect}
        setOpenSelect={setOpenSelect}
        resetState={() => {
          setImages(Array(card.amount).fill([]));
          setDimension('');
          setStyle('');
          setManualPrompts('');
          setGenPerRef(0);
          setFlow('');
        }}
      />
      <form onSubmit={handleCreateImages} className={styles.form}>
        <div className={styles.layerImages}>
          <h3 className={styles.imageTitle}>Image</h3>
          {Array.from({ length: card.amount }).map((_, index) => (
            <CastomSelect
              key={index}
              name={`image${index + 1}`}
              item={
                <ImageLayers
                  index={index}
                  images={images}
                  setImages={setImages}
                  dimension={dimension}
                  setDimension={setDimension}
                  style={style}
                  setStyle={setStyle}
                  manualPrompts={manualPrompts}
                  setManualPrompts={setManualPrompts}
                  genPerRef={genPerRef}
                  setGenPerRef={setGenPerRef}
                  flow={flow}
                  setFlow={setFlow}
                  openSelect={openSelect}
                  setOpenSelect={setOpenSelect}
                />
              }
              openSelect={openSelect}
              setOpenSelect={setOpenSelect}
              resetState={() => {
                setImages(Array(card.amount).fill([]));
                setDimension('');
                setStyle('');
                setManualPrompts('');
                setGenPerRef(0);
                setFlow('');
              }}
            />
          ))}
        </div>
        <button type="submit" className={styles.button}>
          Generate
        </button>
      </form>
    </div>
  );
};

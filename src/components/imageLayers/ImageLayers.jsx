import styles from './ImageLayers.module.css';

export const ImageLayers = ({
  index,
  images,
  setImages,
  dimension,
  setDimension,
  style,
  setStyle,
  manualPrompts,
  setManualPrompts,
  genPerRef,
  setGenPerRef,
  flow,
  setFlow,
}) => {
  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map(file => URL.createObjectURL(file));
    const newImages = [...images];
    newImages[index] = [...(newImages[index] || []), ...fileURLs];
    setImages(newImages);
  };

  const removeImageRef = fileIndex => {
    const newImages = [...images];
    newImages[index] = newImages[index].filter((_, i) => i !== fileIndex);
    setImages(newImages);
  };

  return (
    <div className={styles.formGroup}>
      <select
        name="proportions"
        id="proportions"
        className={styles.select}
        value={dimension}
        onChange={e => setDimension(e.target.value)}
        required
      >
        <option value="" disabled>
          Proportions
        </option>
        <option value="1x1">1x1</option>
        <option value="9x16">9x16</option>
        <option value="16x9">16x9</option>
      </select>

      <select
        name="flow"
        id="flow"
        className={styles.select}
        value={flow}
        onChange={e => setFlow(e.target.value)}
        required
      >
        <option value="" disabled>
          Flow
        </option>
        <option value="other_models_mix">other_models_mix</option>
        <option value="mj_model">mj_model</option>
      </select>

      <p>Image refs</p>
      <input
        type="file"
        className={styles.inputFile}
        multiple
        onChange={handleFileChange}
        required
      />
      <div className={styles.imagePreview}>
        {images[index] &&
          images[index].map((file, fileIndex) => (
            <div key={fileIndex} className={styles.imageItem}>
              <img
                src={file}
                alt={`img-${fileIndex}`}
                className={styles.imageThumb}
              />
              <button
                type="button"
                onClick={() => removeImageRef(fileIndex)}
                className={styles.removeButton}
              >
                x
              </button>
            </div>
          ))}
      </div>

      <input
        type="text"
        placeholder="Manual prompts"
        className={styles.input}
        value={manualPrompts}
        onChange={e => setManualPrompts(e.target.value)}
      />

      <input
        type="number"
        placeholder="Generations per ref"
        className={styles.input}
        onChange={e => setGenPerRef(e.target.value)}
        required
      />

      <select
        name="styles"
        id="styles"
        className={styles.select}
        value={style}
        onChange={e => setStyle(e.target.value)}
        required
      >
        <option value="" disabled>
          Styles
        </option>
        <option value="An ultra-realistic photography">
          An ultra-realistic photography
        </option>
        <option value="Anime style">Anime style</option>
      </select>
    </div>
  );
};

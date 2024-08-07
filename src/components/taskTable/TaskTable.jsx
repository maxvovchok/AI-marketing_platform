import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';
import { generateFormats } from 'services/requests';
import { addTask } from '../../redux/slice/taskSlice';
import styles from './TaskTable.module.css';

export const TaskTable = () => {
  const [taskName, setTaskName] = useState('');
  const [dimension, setDimension] = useState('1x1');
  const [templateID, setTemplateID] = useState('mwpswxcudtwxb');
  const [amount, setAmount] = useState(0);
  const [text, setText] = useState('');
  const [genType, setGenType] = useState('cyclic_generation');
  const [imageLayers, setImageLayers] = useState([]);

  const dispatch = useDispatch();

  const handleCreateTask = async () => {
    if (
      !taskName ||
      !dimension ||
      !templateID ||
      !amount ||
      !genType ||
      imageLayers.length === 0
    ) {
      Notiflix.Notify.failure('❌ Please fill in all required fields.');
      return;
    }

    const newTask = {
      task_name: taskName,
      dimension,
      template_id: templateID,
      amount,
      gen_type: genType,
      image_layers: imageLayers,
      text_layers: [text],
    };

    dispatch(addTask(newTask));
    try {
      console.log(newTask);
      const data = await generateFormats(newTask);
      Notiflix.Notify.success(`${data.message}`);
    } catch (error) {
      Notiflix.Notify.failure('❌ Sorry, something went wrong.');
      console.error(error);
    }
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    const newPreviews = [];

    const newImageLayers = [...imageLayers];

    files.forEach(file => {
      const fileURL = URL.createObjectURL(file);
      newImageLayers.push(fileURL);
      newPreviews.push(fileURL);
    });

    setImageLayers(newImageLayers);
  };

  return (
    <tr className={styles.row}>
      <td>
        <input
          className={styles.input}
          type="text"
          name="Task Name"
          value={taskName}
          required
          onChange={e => setTaskName(e.target.value)}
        />
      </td>
      <td>
        <select
          className={styles.select}
          name="Dimension"
          value={dimension}
          required
          onChange={e => setDimension(e.target.value)}
        >
          <option value="1x1">1x1</option>
          <option value="9x16">9x16</option>
          <option value="16x9">16x9</option>
        </select>
      </td>
      <td>
        <select
          className={styles.select}
          name="Template ID"
          value={templateID}
          required
          onChange={e => setTemplateID(e.target.value)}
        >
          <option value="mwpswxcudtwxb">mwpswxcudtwxb</option>
          <option value="Oxdoscyowl50c">Oxdoscyowl50c</option>
        </select>
      </td>
      <td>
        <input
          className={styles.input}
          type="file"
          name="images"
          multiple
          required
          onChange={handleFileChange}
        />
        <div className={styles.previews}>
          {imageLayers.map((_, index) => (
            <p>image{index + 1}</p>
          ))}
        </div>
      </td>
      <td>
        <input
          className={styles.input}
          type="text"
          name="text"
          value={text}
          required
          onChange={e => setText(e.target.value)}
        />
      </td>
      <td>
        <input
          className={styles.input}
          type="number"
          name="Amount"
          required
          onChange={e => setAmount(Number(e.target.value))}
        />
      </td>
      <td>
        <select
          className={styles.select}
          name="Gen type"
          value={genType}
          required
          onChange={e => setGenType(e.target.value)}
        >
          <option value="cyclic_generation">cyclic_generation</option>
          <option value="random_generation">random_generation</option>
        </select>
      </td>
      <td>
        <button className={styles.button} onClick={handleCreateTask}>
          Generate
        </button>
      </td>
    </tr>
  );
};

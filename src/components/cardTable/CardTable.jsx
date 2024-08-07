import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from './CardTable.module.css';

export const CardTable = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const location = useLocation();

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map(
          (
            {
              task_name,
              dimension,
              template_id,
              amount,
              gen_type,
              image_layers,
              text_layers,
            },
            index
          ) => {
            return (
              <tr key={index}>
                <td>
                  <Link to={`/${index}`} state={{ from: location }}>
                    <h3>{task_name}</h3>
                  </Link>
                </td>
                <td>{dimension}</td>
                <td>{template_id}</td>
                <td>{image_layers}</td>
                <td>{text_layers}</td>
                <td>{amount}</td>
                <td>{gen_type}</td>
                <td></td>
                <td>
                  <button>
                    <a
                      href={`https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${task_name}_${dimension}/format_validation`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Folder
                    </a>
                  </button>
                </td>
              </tr>
            );
          }
        )
      ) : (
        <tr>
          <td colSpan="8">No tasks available</td>
        </tr>
      )}
    </>
  );
};

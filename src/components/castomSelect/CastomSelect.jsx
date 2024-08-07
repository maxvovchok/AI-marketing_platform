import { useState, useEffect } from 'react';
import style from './CastomSelect.module.css';

export const CastomSelect = ({
  name,
  item,
  openSelect,
  setOpenSelect,
  resetState,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (openSelect !== name) {
      setIsActive(false);
    }
  }, [openSelect, name]);

  const handleClick = () => {
    if (openSelect !== name) {
      setOpenSelect(name);
      resetState();
    } else {
      setOpenSelect(null);
    }
    setIsActive(!isActive);
  };

  return (
    <div className={style.dropDown}>
      <div className={style.dropDownBtn} onClick={handleClick}>
        {name}
      </div>
      {isActive && (
        <div className={style.dropDowncontent}>
          <div className={style.dropDownItem}>{item}</div>
        </div>
      )}
    </div>
  );
};

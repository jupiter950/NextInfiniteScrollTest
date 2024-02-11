import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const CustomModal = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open)
  },[props.open])
  
  
  return(
    <>
      <Modal open={open} onClose={props.closeModal} center>
        <div className='modal-container'>
          <div className="card">
            <div className="card-body ">
              <img
                alt={props.data.author}
                src={props.data.download_url}
              />
            </div>
            <div className="card-footer">
              <p className="card-text text-center text-capitalize text-primary">Shot by: {props.data.author}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CustomModal;
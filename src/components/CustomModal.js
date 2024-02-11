import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Image from 'next/image';

const CustomModal = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setOpen(props.open);
    setLoading(true);
  },[props.open])
  
  const onImageLoad = () => {
    setLoading(false)
  }
  
  return(
    <>
      <Modal open={open} onClose={props.closeModal} center>
        <div className='modal-container'>
          <div className="card">
            <div className="card-body position-relative">
              {
                loading ? <Image alt='loading' className='position-absolute z-100' src={'/spinner.gif'} width={100} height={100} /> : <></>
              }
              <Image
                alt={props.data.author}
                src={`${props.data.download_url}`}
                width={100}
                height={100}
                onLoad={onImageLoad}
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
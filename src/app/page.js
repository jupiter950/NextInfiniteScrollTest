"use client"
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useFetch, useInfiniteScroll, useLazyLoading } from '../utils/customHooks';
import 'bootstrap/dist/css/bootstrap.css'
import CustomModal from '@/components/CustomModal';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const onCloseModal = () => setOpen(false);

  const onImageClick = (image) => {
    setOpen(true);
    setModalData(image);
  }

  const imgReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_IMAGES':
        return { ...state, images: state.images.concat(action.images) }
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching }
      default:
        return state;
    }
  }

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state;
    }
  }

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, })

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading('.card-img-top', imgData.images)
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <main>
      <div className="">
        <div id='images' className="container">
          <div className="image-container">
            {imgData.images.map((image, index) => {
              const { author, download_url } = image
              return (
                <div key={index} className="card card-grid">
                  <div className="card-body ">
                    <img
                      alt={author}
                      data-src={download_url}
                      className="card-img-top"
                      src={'./spinner.gif'}
                      onClick={() => onImageClick(image)}
                    />
                  </div>
                  <div className="card-footer">
                    <p className="card-text text-center text-capitalize text-primary">Shot by: {author}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {imgData.fetching && (
          <div className="text-center bg-secondary m-auto p-3">
            <p className="m-0 text-white">Getting images</p>
          </div>
        )}
        <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
      </div>
      <CustomModal open={open} closeModal={onCloseModal} data={modalData} />
    </main>
  );
}

import React from 'react'
import './Preloader.css'

type TPreloaderProps = {
  isLoading: boolean;
}

const Preloader = (props: TPreloaderProps) => {

  const {isLoading} = props;

  return (
    <div className={isLoading ? "preloader_isActive" : "preloader"}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader

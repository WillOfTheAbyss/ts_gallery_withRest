import React, { useState } from 'react'
import { Modal } from 'antd'

interface CardsProps {
  photo: string
  description: string
  name: string
}

const Cards: React.FC<CardsProps> = ({ photo, description, name }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const handleOk = (): void => {
    setIsModalVisible(false)
  }

  const handleCancel = (): void => {
    setIsModalVisible(false)
  }

  return (
    <>
      <div className='layout-content__item'>
        <img
          onClick={showModal}
          alt={photo}
          src={`http://gallery.dev.webant.ru/media/${photo}`}
        />
      </div>
      <Modal
        footer={null}
        closable={false}
        width={728}
        bodyStyle={{ height: 684, borderRadius: 4 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskStyle = {{backgroundColor: 'rgba(0, 0, 0, 0.51)'}}
      >
        <div className='layout-content-modal'>
          <div className='layout-content-modal__prew'>
            <img
              alt={photo}
              src={`http://gallery.dev.webant.ru/media/${photo}`}
            />
          </div>
          <div className='layout-content-modal__name'>{name}</div>
          <div className='layout-content-modal__desc'>{description}</div>
        </div>
      </Modal>
    </>
  )
}

export default React.memo(Cards)

import React, { useState, useEffect, useRef } from 'react'
import { 
  Image as ImageIcon, 
  Trash2, 
  Eye, 
  Plus,
  X,
  Download
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const VisionBoardView = () => {
  const { t, formatDateShort } = useLanguage()
  const [images, setImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newImageTitle, setNewImageTitle] = useState('')
  const [newImageDescription, setNewImageDescription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef(null)

  // Límite de imágenes (configurable)
  const MAX_IMAGES = 12

  // Cargar imágenes guardadas al montar el componente
  useEffect(() => {
    const savedImages = localStorage.getItem('sphere-vision-board-images')
    if (savedImages) {
      setImages(JSON.parse(savedImages))
    }
  }, [])

  // Guardar imágenes cuando cambien
  useEffect(() => {
    localStorage.setItem('sphere-vision-board-images', JSON.stringify(images))
  }, [images])

  // Función para manejar la subida de archivos
  const handleFileUpload = (event) => {
    const file = event.target.files[0] // Solo tomar la primera imagen
    
    if (!file) return
    
    if (images.length >= MAX_IMAGES) {
      alert(`${t('visionBoard.maxImagesError')} ${MAX_IMAGES} ${t('visionBoard.imageCount')}.`)
      return
    }

    if (file.type.startsWith('image/')) {
      setIsProcessing(true)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          src: e.target.result,
          title: newImageTitle || `Imagen ${images.length + 1}`,
          description: newImageDescription || '',
          uploadedAt: new Date().toISOString(),
          file: file
        }
        
        setImages(prev => [...prev, newImage])
        setIsProcessing(false)
        
        // Limpiar el input y cerrar modal
        setNewImageTitle('')
        setNewImageDescription('')
        setShowUploadModal(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
      
      reader.onerror = () => {
        console.error('Error al leer el archivo:', file.name)
        alert(t('visionBoard.imageLoadError'))
        setIsProcessing(false)
      }
      
      reader.readAsDataURL(file)
    } else {
      alert(t('visionBoard.invalidFileType'))
    }
  }

  // Función para eliminar una imagen
  const deleteImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
    if (selectedImage && selectedImage.id === imageId) {
      setSelectedImage(null)
    }
  }

  // Función para abrir modal de subida
  const openUploadModal = () => {
    if (images.length >= MAX_IMAGES) {
      alert(`${t('visionBoard.maxImagesReached')} ${MAX_IMAGES} ${t('visionBoard.imageCount')}.`)
      return
    }
    setShowUploadModal(true)
  }

  // Función para actualizar título y descripción
  const updateImageInfo = (imageId, title, description) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, title, description }
        : img
    ))
  }

  // Función para descargar imagen
  const downloadImage = (image) => {
    const link = document.createElement('a')
    link.href = image.src
    link.download = `${image.title}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="h-full bg-cream p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('visionBoard.title')}</h1>
        <p className="text-gray-600 text-lg">{t('visionBoard.subtitle')}</p>
        {images.length > 0 && (
          <div className="mt-6 inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <ImageIcon className="w-4 h-4 text-soft-blue" />
            <span className="text-sm font-medium text-gray-700">
              {images.length} / {MAX_IMAGES} {t('visionBoard.imageCount')}
            </span>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {images.length > 0 && (
        <div className="text-center">
          <button
            onClick={openUploadModal}
            disabled={images.length >= MAX_IMAGES}
            className="inline-flex items-center space-x-2 bg-soft-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>{t('visionBoard.addImage')}</span>
          </button>
        </div>
      )}

      {/* Images Masonry Grid */}
      {images.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 break-inside-avoid mb-4"
            >
              {/* Image */}
              <div 
                className="cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    <Eye className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => deleteImage(image.id)}
                    className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors shadow-lg"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gradient-to-br from-soft-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ImageIcon className="w-16 h-16 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {t('visionBoard.createVisionBoard')}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
            {t('visionBoard.createMessage')}
          </p>
          <button
            onClick={openUploadModal}
            className="inline-flex items-center space-x-2 bg-soft-blue text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
          >
            <Plus className="w-6 h-6" />
            <span>{t('visionBoard.startVisionBoard')}</span>
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {t('visionBoard.addImage')}
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título de la imagen
                </label>
                <input
                  type="text"
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  placeholder="Ej: Mi casa soñada"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (opcional)
                </label>
                <textarea
                  value={newImageDescription}
                  onChange={(e) => setNewImageDescription(e.target.value)}
                  placeholder="Describe qué representa esta imagen para ti..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>

              {/* File Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seleccionar imagen
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Selecciona una imagen a la vez
                </p>
                {isProcessing && (
                  <p className="text-xs text-blue-600 mt-1">
                    Procesando imagen...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedImage.title}
              </h2>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Image */}
              <div className="text-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-96 object-contain mx-auto rounded-lg"
                />
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={selectedImage.title}
                    onChange={(e) => updateImageInfo(selectedImage.id, e.target.value, selectedImage.description)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={selectedImage.description}
                    onChange={(e) => updateImageInfo(selectedImage.id, selectedImage.title, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                  />
                </div>

                <div className="text-sm text-gray-500">
                  Subida el: {formatDateShort(new Date(selectedImage.uploadedAt))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => downloadImage(selectedImage)}
                  className="flex-1 inline-flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar</span>
                </button>
                <button
                  onClick={() => deleteImage(selectedImage.id)}
                  className="flex-1 inline-flex items-center justify-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default VisionBoardView

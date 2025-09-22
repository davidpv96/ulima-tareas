import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  Circle, 
  Tag, 
  Search
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const WeekPlannerView = () => {
  const { t, formatDateShort } = useLanguage()
  const [notes, setNotes] = useState([])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [newNote, setNewNote] = useState({ title: '', content: '', priority: 'medium' })
  const [searchTerm, setSearchTerm] = useState('')

  // Cargar notas desde localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('sphere-planner-notes')
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (error) {
        console.error('Error loading notes:', error)
      }
    }
  }, [])

  // Guardar notas en localStorage
  useEffect(() => {
    localStorage.setItem('sphere-planner-notes', JSON.stringify(notes))
  }, [notes])


  const priorities = [
    { id: 'low', label: t('planner.low'), color: 'bg-gray-100 text-gray-600' },
    { id: 'medium', label: t('planner.medium'), color: 'bg-blue-100 text-blue-600' },
    { id: 'high', label: t('planner.high'), color: 'bg-red-100 text-red-600' }
  ]

  const addNote = () => {
    if (!newNote.title.trim()) return

    const note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      priority: newNote.priority,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setNotes(prev => [note, ...prev])
    setNewNote({ title: '', content: '', priority: 'medium' })
    setIsAddingNote(false)
  }

  const updateNote = (id, updates) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    )
    setEditingNote(null)
  }

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  const toggleComplete = (id) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, completed: !note.completed, updatedAt: new Date().toISOString() }
          : note
      )
    )
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })


  const getPriorityInfo = (priorityId) => {
    return priorities.find(pri => pri.id === priorityId) || priorities[1]
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return formatDateShort(date)
  }

  return (
    <div className="h-full bg-cream p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('planner.title')}</h1>
        <p className="text-gray-600">{t('planner.subtitle')}</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('planner.searchNotes')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
          />
        </div>
      </div>

      {/* Add Note Button */}
      <div className="text-center">
        <button
          onClick={() => setIsAddingNote(true)}
          className="inline-flex items-center space-x-2 bg-soft-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>{t('planner.addNote')}</span>
        </button>
      </div>

      {/* Add Note Form */}
      {isAddingNote && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('planner.addNote')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.noteTitle')} *</label>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                placeholder={t('planner.exampleTitle')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.noteContent')}</label>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                placeholder={t('planner.exampleContent')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.priority')}</label>
              <select
                value={newNote.priority}
                onChange={(e) => setNewNote(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority.id} value={priority.id}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={addNote}
                disabled={!newNote.title.trim()}
                className="flex-1 bg-soft-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('planner.addNote')}
              </button>
              <button
                onClick={() => {
                  setIsAddingNote(false)
                  setNewNote({ title: '', content: '', priority: 'medium' })
                }}
                className="flex-1 border border-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {t('app.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No se encontraron notas' : t('planner.noNotes')}
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'Intenta con otros términos de búsqueda' 
                : t('planner.noNotesMessage')
              }
            </p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div
              key={note.id}
              className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all ${
                note.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Complete Button */}
                <button
                  onClick={() => toggleComplete(note.id)}
                  className={`mt-1 transition-colors ${
                    note.completed 
                      ? 'text-green-600 hover:text-green-700' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {note.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`font-medium text-gray-900 ${
                      note.completed ? 'line-through' : ''
                    }`}>
                      {note.title}
                    </h3>
                    
                    {/* Priority Badge */}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      getPriorityInfo(note.priority).color
                    }`}>
                      {getPriorityInfo(note.priority).label}
                    </span>
                  </div>

                  {note.content && (
                    <p className={`text-gray-600 text-sm mb-2 ${
                      note.completed ? 'line-through' : ''
                    }`}>
                      {note.content}
                    </p>
                  )}

                  <p className="text-xs text-gray-400">
                    Creado: {formatDate(note.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingNote(note)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('planner.editNote')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.noteTitle')} *</label>
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) => setEditingNote(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.noteContent')}</label>
                <textarea
                  value={editingNote.content}
                  onChange={(e) => setEditingNote(prev => ({ ...prev, content: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.priority')}</label>
                <select
                  value={editingNote.priority}
                  onChange={(e) => setEditingNote(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                >
                  {priorities.map(priority => (
                    <option key={priority.id} value={priority.id}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => updateNote(editingNote.id, editingNote)}
                  disabled={!editingNote.title.trim()}
                  className="flex-1 bg-soft-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('app.save')}
                </button>
                <button
                  onClick={() => setEditingNote(null)}
                  className="flex-1 border border-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  {t('app.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeekPlannerView

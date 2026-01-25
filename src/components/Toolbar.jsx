import React from 'react'
import { useScene } from '../context/SceneContext'

const Toolbar = () => {
  const { 
    transformMode, 
    setTransformMode, 
    selectedObject, 
    clearScene,
    scene,
    updateSceneSettings,
    duplicateObject,
    deleteSelectedObject
  } = useScene()

  const tools = [
    { id: 'select', name: 'Select', icon: '🔍', shortcut: 'V', color: 'from-blue-500 to-blue-600' },
    { id: 'move', name: 'Move (Click to Place)', icon: '↔️', shortcut: 'G', color: 'from-green-500 to-green-600' },
    { id: 'rotate', name: 'Rotate', icon: '🔄', shortcut: 'R', color: 'from-purple-500 to-purple-600' },
    { id: 'scale', name: 'Scale', icon: '📏', shortcut: 'S', color: 'from-amber-500 to-amber-600' },
    { id: 'align', name: 'Align', icon: '📐', shortcut: 'A', color: 'from-cyan-500 to-cyan-600' },
  ]

  const actions = [
    { id: 'duplicate', name: 'Duplicate', icon: '📋', shortcut: 'Ctrl+D' },
    { id: 'delete', name: 'Delete', icon: '🗑️', shortcut: 'Del' },
  ]

  const viewControls = [
    { id: 'grid', name: 'Toggle Grid', icon: '⊞', shortcut: 'G' },
  ]

  const handleToolClick = (toolId) => {
    setTransformMode(toolId)
    console.log(`Tool selected: ${toolId}`)
  }

  const handleActionClick = (actionId) => {
    switch (actionId) {
      case 'duplicate':
        if (selectedObject) {
          duplicateObject()
          console.log('Object duplicated')
        }
        break
      case 'delete':
        if (selectedObject) {
          deleteSelectedObject()
          console.log('Object deleted')
        }
        break
      default:
        console.log(`Action: ${actionId}`)
    }
  }

  const handleViewControlClick = (controlId) => {
    switch (controlId) {
      case 'grid':
        updateSceneSettings({ gridVisible: !scene.gridVisible })
        console.log(`Grid ${!scene.gridVisible ? 'enabled' : 'disabled'}`)
        break
      default:
        console.log(`View control: ${controlId}`)
    }
  }

  const handleNewScene = () => {
    if (window.confirm('Create new scene? This will clear all objects.')) {
      clearScene()
      console.log('Scene cleared')
    }
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-purple-500/20 shadow-2xl backdrop-blur-sm sticky top-20 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Main Tools */}
          <div className="flex items-center gap-4">
            {/* File Operations */}
            <button 
              onClick={handleNewScene}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              title="New Scene (Ctrl+N)"
            >
              <span className="text-lg">📄</span>
              <span className="text-sm">New</span>
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-purple-500/30"></div>

            {/* Transform Tools */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400">Tools:</span>
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className={`group relative p-2 rounded-lg transition-all duration-200 ${
                    transformMode === tool.id 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50 scale-110' 
                      : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20 hover:border-purple-500/40'
                  }`}
                  title={`${tool.name} (${tool.shortcut})`}
                >
                  <span className="text-lg">
                    {tool.icon}
                  </span>
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-purple-500/30"></div>

            {/* Action Tools */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400">Actions:</span>
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  className={`group p-2 rounded-lg transition-all duration-200 ${
                    (action.id === 'duplicate' || action.id === 'delete') && !selectedObject 
                      ? 'bg-slate-800/50 border border-purple-500/10 opacity-40 cursor-not-allowed' 
                      : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20 hover:border-purple-500/40 hover:scale-105'
                  }`}
                  title={`${action.name} (${action.shortcut})`}
                  disabled={action.id === 'duplicate' || action.id === 'delete' ? !selectedObject : false}
                >
                  <span className="text-lg">
                    {action.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Section - View Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">View:</span>
            {viewControls.map((control) => (
              <button
                key={control.id}
                onClick={() => handleViewControlClick(control.id)}
                className={`group p-2 rounded-lg transition-all duration-200 ${
                  control.id === 'grid' && scene.gridVisible
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-green-500/50' 
                    : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20 hover:border-purple-500/40'
                }`}
                title={`${control.name} (${control.shortcut})`}
              >
                <span className="text-lg">
                  {control.icon}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        {selectedObject && (
          <div className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-900/50 to-slate-900/50 rounded-lg border border-purple-500/30">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-purple-300">
                  Selected: <span className="capitalize text-white">{selectedObject.type}</span>
                </span>
                <span className="text-gray-400">
                  Mode: <span className="capitalize font-semibold text-purple-300">{transformMode}</span>
                </span>
              </div>
              <div className="text-gray-400">
                Press <kbd className="px-2 py-0.5 bg-slate-800 rounded border border-purple-500/30 text-xs font-mono text-purple-300">Esc</kbd> to deselect
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Toolbar

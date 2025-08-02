'use client'

import React, { useState, useRef } from 'react'
import { 
  Search, 
  Plus, 
  X, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Type, 
  Code, 
  Hash, 
  List, 
  ListOrdered, 
  Link, 
  RotateCcw, 
  RotateCw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

interface Note {
  id: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function NotesApp() {
  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)

  // Rich text editor commands
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const handleSave = () => {
    if (noteContent.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: noteContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      setNotes(prev => [newNote, ...prev])
      setNoteContent('')
      setIsOpen(false)
      
      // Clear editor content
      if (editorRef.current) {
        editorRef.current.innerHTML = ''
      }
    }
  }

  const handleCancel = () => {
    setNoteContent('')
    setIsOpen(false)
    if (editorRef.current) {
      editorRef.current.innerHTML = ''
    }
  }

  const handleEditorInput = () => {
    if (editorRef.current) {
      setNoteContent(editorRef.current.innerHTML)
    }
  }

  const insertHeading = (level: number) => {
    execCommand('formatBlock', `h${level}`)
  }

  const insertList = (ordered: boolean) => {
    if (ordered) {
      execCommand('insertOrderedList')
    } else {
      execCommand('insertUnorderedList')
    }
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const filteredNotes = notes.filter(note => 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notes</h1>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search notes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80  border-gray-300 rounded-lg"
            />
          </div>
          
          {/* New Button */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-gray-800 text-white cursor-pointer">
                       <Plus className=" h-4 w-4" />
                      New
                     </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-5xl w-[90vw] max-h-[90vh] overflow-y-auto p-0">
              <DialogHeader className="p-6 pb-4 border-b border-gray-200">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  New Transaction Note
                </DialogTitle>
              </DialogHeader>

              {/* Rich Text Editor Toolbar */}
              <div className="px-6 py-4">
                <div className="border border-gray-200 rounded-lg bg-gray-50">
                  {/* First Row of Toolbar */}
                  <div className="flex items-center gap-1 p-3 border-b border-gray-200 flex-wrap bg-white rounded-t-lg">
                    {/* Basic Formatting */}
                    <button
                      onClick={() => execCommand('bold')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Bold"
                    >
                      <Bold size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('italic')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Italic"
                    >
                      <Italic size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('underline')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Underline"
                    >
                      <Underline size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('strikeThrough')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Strikethrough"
                    >
                      <Strikethrough size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('removeFormat')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Remove Format"
                    >
                      <Type size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('formatBlock', 'pre')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Code"
                    >
                      <Code size={16} />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Headings */}
                    <button
                      onClick={() => insertHeading(1)}
                      className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm font-medium"
                      title="Heading 1"
                    >
                      H1
                    </button>
                    <button
                      onClick={() => insertHeading(2)}
                      className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm font-medium"
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button
                      onClick={() => insertHeading(3)}
                      className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm font-medium"
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <button
                      onClick={() => insertHeading(4)}
                      className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm font-medium"
                      title="Heading 4"
                    >
                      H4
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Lists */}
                    <button
                      onClick={() => insertList(false)}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Bullet List"
                    >
                      <List size={16} />
                    </button>
                    <button
                      onClick={() => insertList(true)}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Numbered List"
                    >
                      <ListOrdered size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('outdent')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Outdent"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Superscript/Subscript */}
                    <button
                      onClick={() => execCommand('superscript')}
                      className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer text-xs"
                      title="Superscript"
                    >
                      X²
                    </button>
                    <button
                      onClick={() => execCommand('subscript')}
                      className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer text-xs"
                      title="Subscript"
                    >
                      X₂
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Link */}
                    <button
                      onClick={insertLink}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Insert Link"
                    >
                      <Link size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('unlink')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Remove Link"
                    >
                      <Hash size={16} />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Alignment */}
                    <button
                      onClick={() => execCommand('justifyLeft')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Align Left"
                    >
                      <AlignLeft size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('justifyCenter')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Align Center"
                    >
                      <AlignCenter size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('justifyRight')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Align Right"
                    >
                      <AlignRight size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('justifyFull')}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      title="Justify"
                    >
                      <AlignJustify size={16} />
                    </button>
                  </div>

                  {/* Undo/Redo Row */}
                  <div className="flex items-center gap-1 p-3 bg-gray-50 rounded-b-lg">
                    <button
                      onClick={() => execCommand('undo')}
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer"
                      title="Undo"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button
                      onClick={() => execCommand('redo')}
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer"
                      title="Redo"
                    >
                      <RotateCw size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Editor Content Area */}
              <div className="px-6 flex-1 pb-4">
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorInput}
                  className="w-full min-h-96 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  style={{
                    lineHeight: '1.6',
                    fontSize: '14px'
                  }}
                  suppressContentEditableWarning={true}
                />
              </div>

              <DialogFooter className="p-6 pt-4 border-t border-gray-200 bg-gray-50">
                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-black hover:bg-gray-800 text-white px-6 cursor-pointer"
                  disabled={!noteContent.trim()}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Notes List */}
      <div className="grid gap-4">
        {filteredNotes.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            {searchQuery ? 'No notes found matching your search.' : 'No notes yet. Click "New" to create your first note.'}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div 
                dangerouslySetInnerHTML={{ __html: note.content }} 
                className="prose prose-sm max-w-none"
              />
              <div className="text-xs text-gray-500 mt-2">
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
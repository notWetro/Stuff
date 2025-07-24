import { useState } from 'react'
import './App.css'

const ROWS = 8
const COLS = 10
const ROW_LABELS = ['A','B','C','D','E','F','G','H']
const COL_LABELS = Array.from({length: COLS}, (_, i) => (i+1).toString())
const COLORS = [
  { name: 'Weiß', value: 'white' },
  { name: 'Grün', value: 'green' },
  { name: 'Blau', value: 'blue' },
  { name: 'Rot', value: 'red' },
  { name: 'Gelb', value: 'yellow' },
  { name: 'Schwarz', value: 'black' },
]

function App() {
  const [grid, setGrid] = useState(
    Array.from({length: ROWS}, () => Array(COLS).fill('white'))
  )
  const [popup, setPopup] = useState({ open: false, row: null, col: null })

  const handleCellClick = (row, col) => {
    setPopup({ open: true, row, col })
  }

  const handleColorSelect = (color) => {
    setGrid(prev => {
      const newGrid = prev.map(rowArr => [...rowArr])
      newGrid[popup.row][popup.col] = color
      return newGrid
    })
    setPopup({ open: false, row: null, col: null })
  }

  const handleClose = () => setPopup({ open: false, row: null, col: null })

  return (
    <div className="raster-container">
      <h2 style={{ marginBottom: 24 }}>Kevins super Quizshow</h2>
      <table className="raster-table">
        <thead>
          <tr>
            <th className="col-label"></th>
            {COL_LABELS.map(label => (
              <th className="col-label" key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((rowArr, rowIdx) => (
            <tr key={rowIdx}>
              <th className="row-label">{ROW_LABELS[rowIdx]}</th>
              {rowArr.map((color, colIdx) => (
                <td
                  key={colIdx}
                  className="raster-cell"
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                  style={{
                    background: color,
                  }}
                  title={`Feld ${ROW_LABELS[rowIdx]}${colIdx+1}`}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {popup.open && (
        <div className="popup-backdrop" onClick={handleClose}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <h4 style={{ marginBottom: 18 }}>Farbe wählen</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {COLORS.map(c => (
                <button
                  key={c.value}
                  className="color-btn"
                  onClick={() => handleColorSelect(c.value)}
                  style={{
                    background: c.value,
                    color: c.value === 'yellow' || c.value === 'white' ? '#222' : '#fff',
                  }}
                  aria-label={c.name}
                >
                  {/* Kein Text, nur die Farbe */}
                </button>
              ))}
            </div>
            <button className="cancel-btn" onClick={handleClose}>Abbrechen</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

import React, { useState } from 'react';
import { VscSymbolNamespace, VscOutput, VscRunAll, VscTrash } from 'react-icons/vsc';

// Definieren des Typs für die Style-Objekte
type StyleMap = { [key: string]: React.CSSProperties };

const GeneratorPage: React.FC = () => {
  // TypeScript State-Typisierung: useState<string>
  const [code, setCode] = useState<string>(`Beispiel:
function calculateSum(a, b) {
  return a + b;
}

class Calculator {
  add(a, b) {
    return a + b;
  }
  
  multiply(a, b) {
    return a * b;
  }
}`);
  const [generatedTests, setGeneratedTests] = useState<string>('Hier erscheinen die generierten Unit Tests...');

  const handleGenerateTests = () => {
    // Die Logik zur Generierung der Tests würde hier stehen
    console.log('Tests generieren für:', code);
    setGeneratedTests(`// Tests generiert am ${new Date().toLocaleTimeString()}
// Beispiel-Test
describe('Calculator', () => {
    test('add(1, 2) should return 3', () => {
        expect(new Calculator().add(1, 2)).toBe(3);
    });
});`);
  };

  const handleClearCode = () => {
      setCode('');
  }

  const styles: StyleMap = {
    mainContent: {
      flex: 1, 
      padding: '40px 40px',
      display: 'flex',
      gap: '20px', 
      width: '100%',
    },
    panel: {
      flex: 1,
      backgroundColor: '#2D2D2D', 
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '400px',
    },
    panelHeader: {
      padding: '15px 20px',
      borderBottom: '1px solid #3C3C3C',
      fontSize: '18px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
    },
    textArea: {
      flex: 1,
      padding: '15px 20px',
      backgroundColor: '#2D2D2D',
      color: '#FFFFFF',
      border: 'none',
      resize: 'none',
      fontFamily: 'monospace',
      fontSize: '14px',
      borderRadius: '0 0 8px 8px',
      outline: 'none',
    },
    codeInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    buttonContainer: {
      padding: '15px 20px',
      borderTop: '1px solid #3C3C3C',
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },
    generateButton: {
      backgroundColor: '#6A5ACD', 
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color 0.3s',
      flexGrow: 1, // Nimmt den meisten Platz ein
      justifyContent: 'center',
    } as React.CSSProperties, // Explizites Typing für kompliziertere Styles
    deleteButton: {
        backgroundColor: 'transparent',
        color: '#B0B0B0',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '10px',
    }
  };

  return (
    <main style={styles.mainContent}>
      {/* Linke Spalte: Code-Eingabe */}
      <div style={styles.panel}>
        <div style={{ ...styles.panelHeader, color: '#FFD700' }}>
          <VscSymbolNamespace style={{ marginRight: '10px' }} />
          Code Eingabe
        </div>
        <div style={styles.codeInputContainer}>
          <textarea
            style={styles.textArea}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Geben Sie hier Ihre Methoden, Funktionen oder Klassen ein..."
          />
          <div style={styles.buttonContainer}>
            <button
              style={styles.generateButton}
              onClick={handleGenerateTests}
            >
              <VscRunAll style={{ marginRight: '8px' }} />
              Tests Generieren
            </button>
            {/* Löschen-Button */}
            <button 
                style={styles.deleteButton} 
                onClick={handleClearCode} 
                title="Eingabe löschen"
            >
                <VscTrash /> 
            </button>
          </div>
        </div>
      </div>

      {/* Rechte Spalte: Generierte Unit Tests */}
      <div style={styles.panel}>
        <div style={{ ...styles.panelHeader, color: '#4682B4' }}>
          <VscOutput style={{ marginRight: '10px' }} />
          Generierte Unit Tests
        </div>
        <textarea
          style={styles.textArea}
          value={generatedTests}
          readOnly
          placeholder="Hier erscheinen die generierten Unit Tests..."
        />
      </div>
    </main>
  );
};

export default GeneratorPage;
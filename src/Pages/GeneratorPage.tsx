import React, { useState } from 'react';
import { VscOutput, VscRunAll, VscTrash } from 'react-icons/vsc';
import './Generatorpage.css';
import { sendPromptToGPT } from '../API/ModellsAPI';


const GeneratorPage: React.FC = () => {
  
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

  const handleGenerateTests = async () => {

    try {

      setGeneratedTests('Generiere Tests, bitte warten...');

      const tests = await sendPromptToGPT(code);
    
      console.log('Tests generieren für:', code);
      setGeneratedTests(tests || 'Keine Tests generiert.');
    } 
    catch (error) {
      console.error('Fehler beim Generieren der Tests:', error);
      setGeneratedTests(`Fehler beim Generieren der Tests: ${error}`);
    }
  };



  const handleClearCode = () => {
      setCode('');
  }

  return (
    <main className='main-content'>
      {/* Linke Spalte: Code-Eingabe */}
      <div className='panel'>
        <div className='panel-header code'>
          Code Eingabe
        </div>
        <div className='code-input-container'>
          <textarea
            className='text-area'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Geben Sie hier Ihre Methoden, Funktionen oder Klassen ein..."
          />
          <div className='button-container'>
            <button
              className='generate-button'
              onClick={handleGenerateTests}
            >
              <VscRunAll style={{ marginRight: '8px' }} />
              Tests Generieren
            </button>
            {/* Löschen-Button */}
            <button 
                className='delete-button'
                onClick={handleClearCode} 
                title="Eingabe löschen"
            >
                <VscTrash /> 
            </button>
          </div>
        </div>
      </div>

      {/* Rechte Spalte: Generierte Unit Tests */}
      <div className='panel'>
        <div className='paneld-header output'>
          <VscOutput style={{ marginRight: '10px' }} />
          Generierte Unit Tests
        </div>
        <textarea
          className='text-area'
          value={generatedTests}
          readOnly
          placeholder="Hier erscheinen die generierten Unit Tests..."
        />
      </div>
    </main>
  );
};

export default GeneratorPage;


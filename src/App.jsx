"use client";

import { useState, useRef, useEffect } from "react";
import sonnetsData from "./data/sonnetsData";
import Header from "./components/Header";
import "./styles.css";
export default function App() {
  const inputRef = useRef();
  const [searchInput, setSearchInput] = useState("");
  const [foundSonnet, setFoundSonnet] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  function handleClick() {
    setSearchInput(inputRef.current.value.trim());
    filterSonnet(inputRef.current.value);
    setSearchPerformed(true);
  }

  function filterSonnet(searchInput) {
    let foundSonnet = sonnetsData.filter((sonnet) => {
      for (let line of sonnet.lines) {
        if (line.toLowerCase().includes(searchInput.toLowerCase())) return true;
      }
      return false;
    });

    setFoundSonnet(foundSonnet);
  }

  return (
    <div className="wrapper">
      <Header searchProps={{ inputRef, handleClick }} />

      <div className="sonnets-container">
        {searchPerformed && foundSonnet.length === 0 && (
          <p className="no-results-message">
            Ne yazık ki, araman sonucunda hiçbir şey bulamadın.
          </p>
        )}

        <div className="sonnet">
          {foundSonnet.map((item) => (
            <div key={item.number} className="mb-10">
              <h3>{item.number}</h3>
              {item.lines.map((line, index) => {
                const words = line.split(" ");
                return (
                  <p key={index}>
                    {words.map((word, wordIndex) => {
                      const isMatch = word
                        .toLowerCase()
                        .includes(searchInput.toLowerCase());
                      return isMatch ? (
                        <span key={wordIndex}>{word}</span>
                      ) : (
                        word + " "
                      );
                    })}
                  </p>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
      
  
      
    - Sonuçlar varsa, sonedeki searchInput değeriyle eşleşen her kelimenin etrafına bir <span> koyun. Böylece kelime otomatik olarak vurgulanacaktır (CSS zaten ayarlanmıştır). 
*/

/* Challenge

  Kullanıcı " Arama " butonuna tıkladığında, input alanına yazdığı metin searchInput state'inin değeri olur (bu kod zaten yazılmıştı).    
 1. SonnetsData array'indeki satırlarından birinde searchInput değerini içeren her bir sonnet için "sonnets-container" div'inde className'i "sonnet" olan bir div oluşturun (satır 27). 
    
    2. "sonnet" div'inde, sonenin number özelliğini bir <h3> öğesinin metin içeriği olarak ekleyin ve ardından lines özelliğinden/dizisinden sonenin *her* satırını bir <p> öğesinin text içeriği olarak ekleyin, böylece sonenin her satırı için bir <p> elde edin. 
       
    3. "Love", "summer", "winter" ve "strange" gibi yaygın sözcüklerin yanı sıra "hello" ve "weird" gibi hiçbir sonede geçmeyen sözcükleri arayarak kodunuzu test edin.

      - Arama sonucu yoksa, "sonnets-container" div'inde "Ne yazık ki, araman sonucunda hiçbir şey bulamadın." yazan bir <p> öğesi oluşturun. <p> öğesine "no-results-message" şeklinde bir className verin. 
*/

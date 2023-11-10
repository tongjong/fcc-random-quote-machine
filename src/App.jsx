import "./styles.css";
import { FaQuoteLeft, FaQuoteRight, FaTwitter, FaTumblr } from "react-icons/fa";
import { useEffect, useState } from "react";

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
};

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [randomColor, setRandomColor] = useState(getRandomColor());
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuotes(data.quotes);
        const initialQuote = randomQuote(data.quotes);
        setQuote(initialQuote.quote);
        setAuthor(initialQuote.author);
      });
  }, []);

  const randomQuote = (quoteArray) => {
    const index = Math.floor(Math.random() * quoteArray.length);
    return quoteArray[index];
  };

  const handleClick = () => {
    const newRandomQuote = randomQuote(quotes);
    setQuote(newRandomQuote.quote);
    setAuthor(newRandomQuote.author);
    setRandomColor(getRandomColor());
  };

  return (
    <div className="app-container" style={{ backgroundColor: randomColor }}>
      <div id="quote-box" style={{ color: randomColor }}>
        <div id="quote-content">
          <div className="content">
            <h1 id="text">
              <FaQuoteLeft style={{ marginRight: "10px" }} />
              {quote}
              <FaQuoteRight style={{ marginLeft: "10px" }} />
            </h1>

            <p id="author">-{author}</p>
          </div>
          <div id="icons">
            <a
              href="twitter.com/intent/tweet"
              target="_blank"
              rel="noreferrer"
              id="tweet-quote"
              style={{ backgroundColor: randomColor }}
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="
              target="_blank"
              rel="noreferrer"
              id="tumbler-quote"
              style={{ backgroundColor: randomColor }}
            >
              <FaTumblr />
            </a>

            <button
              id="new-quote"
              onClick={handleClick}
              style={{ backgroundColor: randomColor }}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

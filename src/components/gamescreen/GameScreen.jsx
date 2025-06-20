import './GameScreen.css'
import {useState, useEffect, useRef} from 'react';

import typeCorrect from '../../soundeffect/typeCorrect.ogg'
import typeIncorrect from '../../soundeffect/typeIncorrect.ogg'
import {playAudio} from '../../utils/soundPlayer'

export default function GameScreen({difficulty, setGameState}) {

    //states
    const [currWord, setCurrWord] = useState('');
    const [inputText, setInputText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [time, setTime] = useState(100); //percent, will be used to display timer
    const [timerReset, setTimerReset] = useState(false); //allow color to not transition when the timer resets

    const inputRef = useRef(null);
    const timeRef = useRef(Date.now()); //to allow incorrect letter input to takeaway time

    //get a random word
    const getRandomWord = () => {
        const wordList = wordLists[difficulty];
        //grab word from in there
        return wordList[Math.floor(Math.random() * wordList.length)];
    }

    //handle user input and word completion
    const handleTyping = (e) => {
        //grab input value
        const typed = e.target.value;

        //check if the word is correct so far
        const match = currWord.startsWith(typed);

        if (!match) {
            playAudio(typeIncorrect);
            timeRef.current -= 100;
            return;
        }

    

        //if it matches, this input will be used
        setInputText(typed);
        playAudio(typeCorrect); //play audio

        //if whole word has been typed, generate new word and reset input
        if(currWord === typed) {
            setCurrWord(getRandomWord);
            setInputText('');
            setWordCount(prev => prev + 1);
            timeRef.current = Date.now(); //reset on word completion

            //dont allow transition on timer for like a bit, renable after
            setTimerReset(true);
            setTimeout(() => setTimerReset(false), 100);
        }
    }

    //first word
    useEffect(() => {
        setCurrWord(getRandomWord);
        timeRef.current = Date.now();
    }, []);

    //make sure users cant click off by keeping the input thing highlighted
    useEffect(() => {
        const handleClick = () => {
            inputRef.current.focus();
        };

        // Focus on mount
        inputRef.current.focus();

        // Re-focus on any document click
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    //timer implementation
    useEffect(()=> {
        const base = 4000;
        const decrease = difficulty === 'hard' ? 75 : 100;
        const min = 1500;
        const timeLimit = Math.max(min, base - wordCount*decrease);

        const interval = setInterval(() => {
            const timeElapsed = Date.now() - timeRef.current; //elapsed
            const percent = Math.max(0, 100-(timeElapsed/timeLimit) * 100) //the percentage
            setTime(percent);

            //if we go below time, do something
            if (percent <= 0) {
                clearInterval(interval);
                setGameState('home');
            }
        }, 50);
        
        return () => clearInterval(interval);
    }, [wordCount]);



    const wordLists = {
        easy: [
            "am", "an", "as", "at","be", "by", "do", "go", "he", "if", "in", "is","it", "me", "my", "no", "of", "on", "or", "so", "to", "up", "us", "we",
            "and", "are", "for", "you", "not", "the", "all", "new", "was", "can", "has", "but", "our",
            "one", "may", "out", "use", "any", "see", "his", "who", "now", "get", "how", "its", "top",
            "had", "day", "two", "buy", "her", "add", "jan", "she", "set", "map", "way", "off", "did",
            "car", "own", "end", "him", "per", "big", "law", "art", "usa", "old", "non", "why", "low",
            "man", "job", "too", "men", "box", "air", "yes", "hot", "say", "dec", "san", "tax", "got",
            "let", "act", "red", "key", "few", "age", "oct", "pay", "war", "nov", "fax", "yet", "sun",
            "run", "net", "put", "try", "god", "log", "faq", "fun", "sep", "lot", "ask", "due", "mar",
            "pro", "aug", "ago", "apr", "via", "bad", "far", "jun", "oil"
        ],
        medium: [
            "from", "that", "this", "with", "your", "have", "more", "will", "home", "page",
            "free", "time", "they", "site", "what", "news", "only", "when", "here", "also",
            "help", "view", "been", "were", "some", "like", "than", "find", "date", "back",
            "list", "name", "just", "over", "year", "into", "next", "used", "work", "last",
            "about", "other", "which", "their", "there", "first", "would", "these", "click", "price",
            "state", "email", "world", "music", "after", "video", "where", "books", "links", "years",
            "order", "items", "group", "under", "games", "could", "great", "hotel", "store", "terms",
            "right", "local", "those", "using", "phone", "forum", "based", "black", "check", "index",
            "being", "women", "today", "south", "pages", "found", "house", "photo", "power", "while",
            "three", "total", "place", "think", "north", "posts", "media", "since", "guide", "board",
            "white", "small", "times", "sites", "level", "hours", "image", "title", "shall", "class",
            "still", "money", "every", "visit", "tools", "reply", "value", "press", "learn", "print",
            "stock", "point", "sales", "large", "table", "start", "model", "human", "movie", "march",
            "yahoo", "going", "study", "staff", "again", "april", "never", "users", "topic", "below"
        ],
          hard: [
            "contact", "service", "product", "support", "message", "through", "privacy", "company",
            "general", "january", "reviews", "program", "details", "because", "results", "address",
            "subject", "between", "special", "project", "version", "section", "related", "members",
            "network", "systems", "without", "current", "control", "history", "account", "digital",
            "profile", "another", "quality", "listing", "content", "country", "private", "compare",
            "include", "college", "article", "provide", "process", "science", "english", "windows",
            "gallery", "however", "october", "library", "medical", "looking", "comment", "working",
            "against", "payment", "student", "problem", "options", "america", "example", "changes",
            "release", "request", "picture", "meeting", "similar", "schools", "million", "popular",
            "stories", "journal", "reports", "central", "council", "archive", "society", "friends",
            "edition", "further", "updated", "already", "studies", "several", "display", "limited",
            "powered", "natural", "whether", "average", "records", "present", "written", "federal",
            "hosting", "tickets", "finance", "minutes",
            "search", "online", "people", "health", "should", "system", "policy", "number", "please",
            "rights", "public", "school", "review", "united", "center", "travel", "report", "member",
            "before", "hotels", "office", "design", "posted", "within", "states", "family", "prices",
            "sports", "county", "access", "change", "rating", "during", "return", "events", "little",
            "movies", "source", "author", "around", "course", "canada", "credit", "estate", "select",
            "photos", "thread", "market", "really", "action", "series", "second", "forums", "better",
            "friend", "server", "issues", "street", "things", "person", "mobile", "offers", "recent",
            "stores", "memory", "social", "august", "create", "single", "latest", "status", "browse",
            "seller", "always", "result", "groups", "making", "future", "london", "become", "garden",
            "listed", "energy", "images", "notice", "others", "format", "months", "safety", "having",
            "common", "living", "called", "period", "window", "france", "region", "island", "record",
            "direct"
        ]
    }

    return (
        <div className="gameContainer">
            <div className="gameContent">
                <p className="gameDisplay">
                    {/* split the word into characters so i can check if theyve matched seperately and style accordingly */}

                    {currWord.split('').map((c, i) => (
                        <span key={i} className={`gameLetter ${i < inputText.length ? 'matched' : ''} ${i === inputText.length ? 'next' : ''}`}>
                            {c}
                        </span>
                    ))}
                </p>

                <div className="gameTimer" style={{
                        width: `${time}%`,
                        transition: timerReset ? 'none' : 'width 50ms linear, background-color 0.2s linear', //50ms for interval time
                        backgroundColor: time > 35 ? 'var(--accentcolor)' : 'red' //once we're 50% of the way done the time, begin changing the background color to red
                    }}></div>

                {/* where the user actually inputs */}
                <input
                    className="gameInput"
                    type="text"
                    value={inputText}
                    onChange={handleTyping}
                    ref={inputRef}
                    autoFocus
                />
            </div>
        </div>
    );
}
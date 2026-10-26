import {useState} from "react";

function App() {

    const [title, setTitle] = useState("");
    const [type, setType] = useState("드라마");
    const [rating, setRating] = useState(0);
    const [list, setList] = useState([]);


    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeType = (e) => {
        setType(e.target.value);
    };

    const handleChangeRating = (e) => {
        setRating(Number(e.target.value));
    };

    const newMovie = {
        title: title,
        type: type,
        rating: rating,
        completed: false,
    }

    const handleCheckMovie = (index) => {
        const watchingList = list.map((item, i) => {
            if (i !== index) {
                return item;
            }
            return {...item, completed: !item.completed};
        })
        setList(watchingList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setTitle("");
            return;
        }

        setList([newMovie, ...list]);

        setTitle("");
        setType("드라마");
        setRating(5);
    }

    const handleDelete = (index) => {
        const newList = list.filter((item, i) => i !== index);
        setList(newList);
    }

    const completed = list.filter((item) => item.completed).length;


    return (
        <>
            <h2>나의 영화 기록장</h2>
            <fieldset>
                <legend>영화 추가</legend>
                <form onSubmit={handleSubmit}>
                    <input placeholder={"영화 제목"} onChange={handleChangeTitle} value={title}/>
                    <select onChange={handleChangeType} value={type}>
                        <option>드라마</option>
                        <option>액션</option>
                        <option>SF</option>
                        <option>멜로</option>
                        <option>공포</option>
                    </select>
                    <select onChange={handleChangeRating} value={rating}>
                        <option value="5">별점 5점</option>
                        <option value="4">별점 4점</option>
                        <option value="3">별점 3점</option>
                        <option value="2">별점 2점</option>
                        <option value="1">별점 1점</option>
                    </select>
                    <button type={"submit"}>추가</button>
                </form>
            </fieldset>
            <h3>전체 {list.length}편 / 감상 완료 {completed}편</h3>
            <div style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
                flexWrap: "wrap",
            }}>
                {list.map((item, index) => {
                    return (
                        <div key={index}
                             style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 gap: "2px",
                                 width: "200px",
                                 height: "140px",
                                 padding: "12px",
                                 border: "1px solid #ccc",
                                 borderRadius: "12px",
                                 opacity: item.completed ? 0.6 : 1,
                             }}>
                            <div style={{
                                fontWeight: "bold",
                                marginBottom: "4px",
                            }
                            }>{item.title}</div>
                            <div>장르: {item.type}</div>
                            <div>
                                {[1, 2, 3, 4, 5]
                                    .map((num) => num <= item.rating ? "★" : "☆")
                                    .reduce((acc, star) => acc + star, "")}
                            </div>
                            <div>
                            <input type={"checkbox"} checked={item.completed} onChange={() => {
                                handleCheckMovie(index)
                            }}/>감상 완료
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleDelete(index)
                                }}>
                                    삭제
                                </button>
                            </div>
                        </div>
                    )
                })}</div>
        </>
    );
}

export default App;
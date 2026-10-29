import { useState } from "react";
import styles from "./App.module.css";

function App() {
    // 강사님 보강

    // 리턴쪽 옵션이 반복되니까 배열을 만들어서 맵으로 출력
    // 장점 배열에 첨삭하는 것으로 빠른 수정이 가능함
    // const genres = ["액션", "코미디", "드라마", "SF", "공포"]

    // 별점의 배열
    const ratings = ["5", "4", "3", "2", "1"];

    // 초기값을 "드라마", "5"와 같이 특정 값으로 하기 보단
    // 배열을 초기값으로 하는 게 유지보수에 용이함
    // ex) 옵션의 "드라마" 라는 값이 없는 상태에서 초기값 "드라마"를 출력하는 건 오류!
    const [title, setTitle] = useState("");
    const [type, setType] = useState("드라마");
    const [rating, setRating] = useState("5");
    const [list, setList] = useState([]);

    const handleChangeTitle = e => {
        setTitle(e.target.value);
    };

    const handleChangeType = e => {
        setType(e.target.value);
    };

    const handleChangeRating = e => {
        setRating(e.target.value);
    };

    const handleCheckMovie = index => {
        const watchingList = list.map((item, i) => {
            if (i !== index) {
                return item;
            }
            return { ...item, completed: !item.completed };
        });
        setList(watchingList);
    };

    const handleSubmit = e => {
        e.preventDefault();

        // 1. 저장하지 말아야 되는 상황에 대한 정리가 선행되어야 함

        // 연결할 타이틀을 .트림이 선언된 대상으로 했으면 좋았을 듯
        if (!title.trim()) {
            setTitle("");
            return;
        }

        const newMovie = {
            title: title, // key와 value의 스펠링이 같으면 생략 가능
            type, // 둘의 스펠링이 같으니 생략된 것
            rating: rating,
            completed: false, // 키와 밸류가 다르니 구분해줘야 함
        };

        setList([newMovie, ...list]);

        setTitle("");
        setType("드라마");
        setRating("5");
    };

    const handleDelete = index => {
        const newList = list.filter((item, i) => i !== index);
        setList(newList);
    };

    const completed = list.filter(item => item.completed).length;
    // const yesCompleted = list.reduce((sum, item) => {
    // return item.completed ? sum + 1 : sum
    // }, 0);

    return (
        <div className={styles.container}>
            <h2>영화 기록장</h2>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>영화 추가</legend>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}>
                    <input
                        className={styles.movieInput}
                        placeholder={"영화 제목"} onChange={handleChangeTitle} value={title} />
                    <select onChange={handleChangeType} value={type}>
                        {/* 장르스라 선언했으니 뽑아먹으면 됨*/}
                        {/* {genres.map((item, index) => {
                         return <options key={index}>{item}</options>}*/}
                        <option>드라마</option>
                        <option>액션</option>
                        <option>SF</option>
                        <option>멜로</option>
                        <option>공포</option>
                    </select>
                    <select onChange={handleChangeRating} value={rating}>
                        {/* 여기도 별점을 뜻하는 레이팅스에 맵 함수를 돌리면 좋음*/}
                        {ratings.map((item, index) => {
                            return (
                                <option key={index} value={item}>
                                    별점 {item}점
                                </option>
                            );
                        })}
                        {/* 기존의 코드를 주석 처리 후, 강사님 것으로 변경 */}
                        {/*<option value="5">별점 5점</option>*/}
                        {/*<option value="4">별점 4점</option>*/}
                        {/*<option value="3">별점 3점</option>*/}
                        {/*<option value="2">별점 2점</option>*/}
                        {/*<option value="1">별점 1점</option>*/}
                    </select>
                    <button type={"submit"}>추가</button>
                </form>
            </fieldset>
            <h3>
                전체 {list.length}편 / 감상 완료 {completed}편
            </h3>
            <div className={styles.movieList}>
                {list.map((item, index) => {
                    // 여기에 if문을 걸 수 있음
                    return (
                        <div
                            key={index}
                            className={styles.movieCard}
                            style={{ opacity: item.completed ? 0.6 : 1 }}>
                            <div className={styles.movieTitle}>{item.title}</div>
                            <div className={styles.movieGenre}>장르: {item.type}</div>
                            <div className={styles.starIcon}>
                                {/* if문과 같은 기능을 하는 삼항연산자로 표현할 수 있음 */}
                                {/* repeat(숫자) 메서드 : 제공된 string을 숫자만큼 반복 */}
                                {"★".repeat(Number(item.rating)) +
                                    "☆".repeat(5 - Number(item.rating))}

                                {/*{[1, 2, 3, 4, 5]*/}
                                {/*    .map((num) => num <= item.rating ? "★" : "☆")*/}
                                {/*    .reduce((acc, star) => acc + star, "")}*/}
                            </div>
                            <div className={styles.cpBox}>
                                {/* <label>
                                        <input/> *div가 아니라 label로 묶었으면 좋았을 듯*
                                    </label>*/}
                                <input
                                    type={"checkbox"}
                                    checked={item.completed}
                                    onChange={() => {
                                        // 값을 바꿔야 되는 대상이 input이 아니라 목록 안에 있는 항목
                                        // 이용해야 되는 값이 index임 => 매개변수로 제공이 되어야 된다는 뜻
                                        handleCheckMovie(index);
                                    }}
                                />
                                감상 완료
                            </div>
                            <div className={styles.del}>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => {
                                        handleDelete(index);
                                    }}>
                                    삭제
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;

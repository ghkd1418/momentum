const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const toDoInput = document.querySelector("#todo-form input");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDo() {
	//새로고침 시 todo-list 지워짐 ---솔루션-->> local storage에 저장하기
	localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(clickEvent) {
	const li = clickEvent.target.parentElement;
	li.remove(); //list item 삭제
	toDos = toDos.filter((toDo) => toDo.id != li.id);
	saveToDo();
}

function paintToDo(newToDo) {
	const li = document.createElement("li");
	li.id = newToDo.id;
	const span = document.createElement("span");
	span.innerText = newToDo.text;
	const button = document.createElement("button");
	// 삭제 버튼 이미지 생성
	// const deleteButton = document.createElement("img");
	// deleteButton.id = "deleteButton";
	// deleteButton.src = `img/delete.png`;
	// li.button.appendChild(deleteButton);
	button.innerText = "❌";
	button.addEventListener("click", deleteToDo);
	span.addEventListener("click", (event) => {
		event.target.classList.toggle("complete"); // 취소선
	});
	li.appendChild(span);
	li.appendChild(button);
	todoList.appendChild(li);
}

function handleToDoSubmit(event) {
	event.preventDefault();
	const newToDo = toDoInput.value;
	toDoInput.value = "";
	const newToDoObj = {
		text: newToDo,
		id: Date.now(),
	};
	// todolist 개수 제한
	if (toDos.length < 9) {
		toDos.push(newToDoObj);
		paintToDo(newToDoObj);
		saveToDo();
	}
}

todoForm.addEventListener("submit", handleToDoSubmit);

const saveToDos = localStorage.getItem(TODOS_KEY);

if (saveToDos) {
	const parsedToDos = JSON.parse(saveToDos);
	toDos = parsedToDos;
	parsedToDos.forEach(paintToDo); // [{"text":"a","id":1646900814256}] 이러한 형식으로 만들어줌
}
// 배열에서 뭔가를 지우려면 아이템이 지워지는게 아닌 제외되고 새로운 배열이 만들어지는것

//추가할 사항 --- 4.7

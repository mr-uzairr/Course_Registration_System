document.getElementById("addCourseForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const seats = document.getElementById("seats").value;

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/admin/course", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, seats }),
    });

    const data = await response.json();
    alert(data.message);
    location.reload();
});

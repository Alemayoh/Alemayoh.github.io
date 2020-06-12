<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Feeds</title>
</head>
<body>
<ul>
    <li class="list-inline-item">
        <a href=".">Home</a>
    </li>
    <li class="list-inline-item">
        <a href="logout">Logout</a>
    </li>
</ul>
<h1>This is your feeds page: ${requestScope.get("user").username}</h1>
</body>
</html>

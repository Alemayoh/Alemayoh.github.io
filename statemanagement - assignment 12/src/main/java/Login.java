import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/login")
public class Login extends HttpServlet {
    protected Users users;

    @Override
    public void init() throws ServletException {
        super.init();
        this.users = new Users();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        String username = null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("username")) {
                username = cookie.getValue();
            }
        }
        request.setAttribute("username", username);
        request.getRequestDispatcher("login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String remember = request.getParameter("remember");

            //we need to validate if the user exists or not
            //and start a session if it does
            User user = users.getUserByUsername(username);
            if (user == null) {
                throw new Exception("User not found");
            }

            if (!user.getPassword().equals(password)) {
                throw new Exception("Password does not match.");
            }

            //start a session
            HttpSession session = request.getSession();
            session.setAttribute("id", user.getId());

            if (remember != null && remember.equals("1")) {
                Cookie cookie = new Cookie("username", username);
                cookie.setMaxAge(86400 * 30);
                response.addCookie(cookie);
            } else {
                Cookie[] cookies = request.getCookies();
                for (Cookie cookie : cookies) {
                    if (cookie.getName().equals("username")) {
                        cookie.setMaxAge(0);
                        response.addCookie(cookie);
                        break;
                    }
                }
            }

            //redirect to home page
            response.sendRedirect("http://localhost:8080/wap/");
        } catch (Exception e) {
            System.out.println("Error");
            System.out.println(e.getMessage());
            request.setAttribute("message", e.getMessage());
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}

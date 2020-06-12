import javax.servlet.ServletException;
import javax.servlet.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/")
public class Home extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //check if the exists or not
        //if it does not exist create this cookie and
        //add it to response

        int isCookie = 0;
        Cookie[] cookies = request.getCookies();

       for (Cookie cookie : cookies) {
            if (cookie.getName().equals("promo")) {
                isCookie = 1;
               break;
            }
        }
        if (isCookie == 0) {
            Cookie cookie = new Cookie("promo", "100");
            int age = 86400 * 30;
            cookie.setMaxAge(age);
            response.addCookie(cookie);

        }
       request.getRequestDispatcher(",home.jsp").forward(request, response);
    }
}

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter("/*")
public class AuthFilter implements Filter {
    Users users;

    public void init(FilterConfig var1) {
        this.users = new Users();
    }

    public void doFilter(ServletRequest var1, ServletResponse var2, FilterChain var3) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) var1;
        HttpServletResponse response = (HttpServletResponse) var2;

        String path = request.getServletPath();
        if (path.equals("/login") || path.equals("/register") || path.equals("/")) {
            //continue normal operation
            var3.doFilter(var1, var2);
            return;
        }

        HttpSession session = request.getSession();
        if (session.getAttribute("id") == null) {
            response.sendRedirect("http://localhost:8080/wap/login");
            return;
        }

        User user = this.users.getUserById(session.getAttribute("id").toString());

        if (user == null) {
            response.sendRedirect("http://localhost:8080/wap/login");
            return;
        }

        request.setAttribute("user", user);

        //continue normal operation
        var3.doFilter(var1, var2);
    }

    public void destroy() {

    }
}

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter("/*")
public class DbFilter implements Filter {
    public void init(FilterConfig config) {

    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws ServletException, IOException {
        // connect to db
        //req.setAttribute("db", db);
        chain.doFilter(req, res);
    }

    public void destroy() {

    }
}

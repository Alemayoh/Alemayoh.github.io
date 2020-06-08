import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class SupportServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        out.print("<html><head><title>CSTech Support Form</title></head><body>");
        out.print(("<form method = 'post'>"));
        out.print("Name:");
        out.print("<input type = 'text' name = 'name'><br />");
        out.print("Email:");
        out.print("<input type = 'email' name = 'email'><br />");
        out.print("Problem:");
        out.print("<input type  = 'text' name = 'problem'><br />");
        out.print("Problem description");
        out.print("<textarea name = 'problemarea' cols = '40' rows = '8'></textarea><br />");
        out.print("<input type = 'submit' value = 'Help' />");
        out.print("</form>");
        out.print("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        out.print("<html><head><title>Thank you!</title></head><body>");

        String name = request.getParameter("name");
        String email = request.getParameter("email");

        ServletContext sc = this.getServletContext();

        out.print("<p>Thank you! " + name + " for contacting us. You  should receive reply from us within 24 hrs" +
                " in your email address " + email + ". Let us know in our support email " + sc.getInitParameter("support-email") +
                " if you don\'t receive reply within 24 hrs. Please be sure to attach your reference #" + (int)(Math.random()*1000) +
                " in your email. </p>");
        out.print("</body></html>");

    }


}

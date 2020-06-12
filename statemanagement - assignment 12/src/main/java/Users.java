import java.util.ArrayList;
import java.util.List;

public class Users {
    protected List<User> users;

    public Users() {
        users = new ArrayList<>();
        users.add(new User("Alemayoh", "1234", 1));
        users.add(new User("user2", "123", 2));
    }

    public User getUserByUsername(String username) {
        for (User user : users) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }

        return null;
    }

    public User getUserById(String id) {
        for (User user : users) {
            if (user.getId().equals(Integer.valueOf(id))) {
                return user;
            }
        }

        return null;
    }
}

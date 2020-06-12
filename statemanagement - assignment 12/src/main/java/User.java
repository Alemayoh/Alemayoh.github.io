public class User {
    private String username;
    private String password;
    private Integer id;

    User(String username, String password, Integer id) {
        this.username = username;
        this.password = password;
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public Integer getId() {
        return id;
    }
}

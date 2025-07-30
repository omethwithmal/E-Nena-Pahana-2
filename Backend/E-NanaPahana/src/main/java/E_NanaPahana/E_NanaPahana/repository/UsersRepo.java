package E_NanaPahana.E_NanaPahana.repository;

import E_NanaPahana.E_NanaPahana.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UsersRepo extends JpaRepository<OurUsers, Integer> {

    Optional<OurUsers> findByEmail(String email);

}

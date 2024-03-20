package com.inverbautista.isc.raffle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RaffleRepository extends JpaRepository<Raffle,Long> {
    List<Raffle> findByStatus(RaffleStatus raffleStatus);

}


package com.inverbautista.isc.sale;

import com.inverbautista.isc.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale,Long> {
    List<Sale> findByClient_IdNumberOrderByDateDesc(Long id);



}

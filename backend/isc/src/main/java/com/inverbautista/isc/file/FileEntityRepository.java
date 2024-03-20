package com.inverbautista.isc.file;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FileEntityRepository extends JpaRepository<FileEntity,Long> {

}

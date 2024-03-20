package com.inverbautista.isc.file;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.inverbautista.isc.raffle.Raffle;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Table(name = "FILEENTITY")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String url;


    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "raffle_id")
    private Raffle raffle;


}

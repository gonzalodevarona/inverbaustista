package com.inverbautista.isc.user;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@MappedSuperclass
public abstract class User {


    private String name;

    private String lastName;

    private String email;



}

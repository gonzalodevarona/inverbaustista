package com.inverbautista.isc;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/v1")
@RequiredArgsConstructor
public class DemoController {

    @GetMapping(value = "${adminPrefix}/demo")
    public String welcome()
    {
        return "Welcome from secure endpoint";
    }
}

package com.inverbautista.isc.mercadoPago;

import com.inverbautista.isc.mercadoPago.dto.MercadoPagoRequestDto;
import com.inverbautista.isc.mercadoPago.dto.MercadoPagoResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@RequestMapping("/pay")
public class MercadoPagoController {

    private IMercadoPagoService mercadoPagoService;

    public MercadoPagoController(IMercadoPagoService mercadoPagoService) {
        this.mercadoPagoService = mercadoPagoService;
    }

    @PostMapping
    public ResponseEntity<MercadoPagoResponseDto> generatePreference(@Valid @RequestBody MercadoPagoRequestDto mercadoPagoRequestDto){
        return ResponseEntity.ok(mercadoPagoService.generatePreference(mercadoPagoRequestDto));
    }


    @PostMapping("/notify")
    public ResponseEntity<?> notifyPayment(@RequestBody Map<String,
                Object> bodyReceivedMap,
                                      @RequestParam Map<String, Object> queryReceivedMap,
                                      HttpServletRequest request) {
        System.out.println("-----------");
        System.out.println("Notification request: "+request.getRequestURI());
        System.out.println("from host:" + request.getRemoteHost()+" addr: "+request.getRemoteAddr());
        System.out.println("Timestamp: "+ LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss a")));
        System.out.print("query: ");
        System.out.println(queryReceivedMap);
        System.out.print("body Map: ");
        System.out.println(bodyReceivedMap);
        System.out.println("-----------");
        mercadoPagoService.processNotification(bodyReceivedMap);
        return new ResponseEntity<>(bodyReceivedMap, HttpStatus.OK);
    }


}

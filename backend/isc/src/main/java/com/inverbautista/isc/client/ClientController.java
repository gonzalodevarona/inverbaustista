package com.inverbautista.isc.client;


import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.raffle.Raffle;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client${adminPrefix}")
public class ClientController {

    private IClientService clientService;

    public ClientController(IClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping()
    public ResponseEntity<List<ClientDto>> getAllClients(@RequestParam(value = "sales", defaultValue = "false") boolean includeSales) throws BusinessLogicException{
        return ResponseEntity.ok(clientService.getAllClients(includeSales));
    }

    @PostMapping()
    public ResponseEntity<Client> addClient(@Valid @RequestBody ClientDto client) {
        return new ResponseEntity<Client>(clientService.addClient(client), HttpStatus.CREATED);
    }

}

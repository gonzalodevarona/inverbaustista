package com.inverbautista.isc.raffle;

import com.inverbautista.isc.exception.BusinessLogicException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/raffle")
public class RaffleController {

    private IRaffleService raffleService;

    public RaffleController(IRaffleService raffleService) {
        this.raffleService = raffleService;
    }

    @GetMapping()
    public ResponseEntity<List<RaffleDto>> getAllRafflesFiltered(@RequestParam(value = "tickets", defaultValue = "false") boolean includeTickets, @RequestParam(value = "status", defaultValue = "ACTIVE") String status) throws RuntimeException{
        return ResponseEntity.ok(raffleService.getAllRafflesFiltered(includeTickets, status));
    }

    @GetMapping("/available")
    public ResponseEntity<List<RaffleDto>> getActiveRafflesWithAvailableTickets() throws RuntimeException, BusinessLogicException{
        return ResponseEntity.ok(raffleService.getActiveRafflesWithAvailableTickets());
    }

    @GetMapping("${adminPrefix}/sellable")
    public ResponseEntity<List<RaffleDto>> getSellableRaffles() throws RuntimeException, BusinessLogicException{
        return ResponseEntity.ok(raffleService.getSellableRaffles());
    }


    @GetMapping("${adminPrefix}/all")
    public ResponseEntity<List<RaffleDto>> getAllRaffles(@RequestParam(value = "tickets", defaultValue = "false") boolean includeTickets){
        return ResponseEntity.ok(raffleService.getAllRaffles(includeTickets));
    }

    @PostMapping("${adminPrefix}")
    public ResponseEntity<Raffle> addRaffle(@Valid @RequestBody  RaffleDto raffle) throws BusinessLogicException {
        return new ResponseEntity<Raffle>(raffleService.addRaffle(raffle), HttpStatus.CREATED);
    }


    @PutMapping("${adminPrefix}/{id}")
    public ResponseEntity<RaffleDto> editRaffle(@PathVariable("id") Long raffleId, @Valid @RequestBody  RaffleDto raffle) throws BusinessLogicException {
        System.out.println(raffle);
        return ResponseEntity.ok(raffleService.editRaffle( raffleId, raffle));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RaffleDto> getRaffleById(@PathVariable("id") Long raffleId, @RequestParam(value = "tickets", defaultValue = "false") boolean tickets) throws BusinessLogicException {
        return ResponseEntity.ok(raffleService.getRaffleById(raffleId, tickets));
    }

    @DeleteMapping("${adminPrefix}/{id}")
    public ResponseEntity deleteRaffleById(@PathVariable("id") Long raffleId) throws BusinessLogicException {
        raffleService.deleteRaffleById(raffleId);
        return  ResponseEntity.ok("Erased raffle with id "+ raffleId);
    }




} // end of class






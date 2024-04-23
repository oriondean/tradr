package com.oriondean.exchange;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
@RequiredArgsConstructor
public class TradeEventListener {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final TradeRepository repository;

    @EventListener
    public void handleWebSocketConnectListener(SessionSubscribeEvent event) {
        simpMessagingTemplate.convertAndSend("/topic/trades", repository.findAll());
    }


}

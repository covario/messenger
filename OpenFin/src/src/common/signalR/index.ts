import * as signalR from '@microsoft/signalr';

const { NEXT_PUBLIC_SIGNAL_R_ENDPOINT } = process.env;

export const signalRconnection = new signalR.HubConnectionBuilder()
  .withUrl(NEXT_PUBLIC_SIGNAL_R_ENDPOINT!)
  .configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .build();

export const startSignalRconnection = () => signalRconnection.start();

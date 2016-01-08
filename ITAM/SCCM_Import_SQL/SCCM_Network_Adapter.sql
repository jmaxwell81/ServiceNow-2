/*SCCM Network Adapter */
SELECT DISTINCT
v_GS_Network_Adapter_Configuration.servicename0 as name,
v_GS_Network_Adapter_Configuration.macaddress0 as mac_address, 
v_GS_Network_Adapter_Configuration.ipaddress0 as ip_address,
v_GS_Network_Adapter_Configuration.defaultipgateway0 as ip_default_gateway,
v_GS_Network_Adapter_Configuration.dhcpenabled0 as dhcp_enabled,
v_GS_Network_Adapter_Configuration.ipsubnet0 as netmask,
v_GS_Network_Adapter_Configuration.resourceid as correlation_id
FROM v_GS_Network_Adapter_Configuration
WHERE v_GS_Network_Adapter_Configuration.servicename0 NOT LIKE 'Ras%'
AND v_GS_Network_Adapter_Configuration.servicename0 NOT IN ('', 'AsyncMac', 'NdisWan', 'tapvyprvpn', 'tunnel', 'teamviewervpn', 'BthPan', 'PptpMiniport', 'VBoxNetAdp')
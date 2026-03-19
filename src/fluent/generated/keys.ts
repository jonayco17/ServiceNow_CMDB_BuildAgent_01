import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'bb2905a8f9ad42099bb5af2f1bc05b4e'
                    }
                    'cmdb-discovery-api': {
                        table: 'sys_ws_definition'
                        id: '27cd45502cab44dfa408759a77a36cab'
                    }
                    'cmdb-discovery-utils': {
                        table: 'sys_script_include'
                        id: '73ac420fc54d49c9936459531a226d8c'
                    }
                    'get-cmdb-tables': {
                        table: 'sys_ws_operation'
                        id: 'bbaeb9a097094e9da0ff11dd3511960d'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '4731a5c964a7421c8cb1cf4532419de6'
                    }
                    'schedule-next-discovery': {
                        table: 'sys_script'
                        id: '5b26cb0556c945efbe9880d14557bf9d'
                    }
                    'src_server_business-rules_schedule-discovery_js': {
                        table: 'sys_module'
                        id: '775df0f3e44c43bfb66c245a6244e6de'
                    }
                    'src_server_rest-api_get-cmdb-tables_js': {
                        table: 'sys_module'
                        id: 'cc46e5a2976e422a8eb05a778d5a02b0'
                    }
                    'src_server_script-includes_cmdb-discovery-utils_js': {
                        table: 'sys_module'
                        id: '72d5c94b91d843d3a3fac11477277d5c'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '01bc7c1d0beb4b58b9a1897b359d62aa'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '01cdf416961d42cebcc409ee862a2540'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'discovery_config'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '024de77a6ef943159b99b2dff6c67488'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1079779e75be4e2faac1b38e3a15df2c'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'source_field'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '108fb6378a064756959c13c8b22a79fb'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '109f3d12ace841fbb04587c765b4434c'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'transformation_script'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '10b5437520da4993b0eedbeb8a130970'
                        key: {
                            name: 'x_1791907_cmdb_dis/main.js.map'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1736138921d4482ab1f5807b1e3a2ddf'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                            value: 'reference'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1b6d82fe1a544b918e7d4540c4842b16'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_frequency'
                            value: 'hourly'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1de89a63a5cf40d69363f451cbc4337c'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_script'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '22ff7b4d2c0f4893b33781ce94a0560f'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_manager.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '238fbf32877445208c4d938bbfa39734'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_frequency'
                            value: 'weekly'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '249ac6886ece4bd28141e93a7aa5fff8'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_method'
                            value: 'file'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '252bf3e114094184903b2f770914c578'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_frequency'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2598c98c364245979178a1118edcc2d0'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '279c73f64104413f86431ca29d704d22'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '27e46cbb26f04eb8b1b54e221b458619'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                            value: 'integer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '281c582a9a784566ad9dac1a4ccec975'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_frequency'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2b2ea4f6a17b4978a72ca9a8abd27696'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'transformation_script'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2f202b68501a401aa8f1dcac77a1e60e'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3109dcde0d6b47978f7a4311700545e1'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'target_field'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3530dd198c2945389c273d41a780e514'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                            value: 'choice'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '39774bd3563e4f3c924f4eb6f49ac873'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_frequency'
                            value: 'realtime'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3e47c94ba1954c588c6c4556d6bd6d2b'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'target_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '402524603c114e15a499f590e6b58c64'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '41fa843450e54f56af0939eff6829929'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '444ad9bda04242188f49468d5c76f08a'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '44ea882cb8b14560897b04f2a5d88e6c'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'created_by'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4a28ff55f13b4c12a4b6e08cb2d556fa'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'source_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4c4962d2632b42e8a27d76f242cb4022'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '529391bd19aa41ab9c4a4397ab5fcfdf'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                            value: 'decimal'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '52a07be8bfd34062a1824e6731848f2d'
                        key: {
                            endpoint: 'x_1791907_cmdb_dis_discovery_manager.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5cec346b68434e59892f11f40ce8fb6c'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'records_discovered'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6477f3a743c247ac9b98121e5aa92a92'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'sequence'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '683be9aab4504aec9034cff626d0ac5d'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6959796d276241b3ad742604d5efe704'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_method'
                            value: 'database'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6b6a45d8dd7c4a0e8f2745b6b443965b'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'target_field'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '71720babb05f4401a6bc639f9a6211ae'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'source_field'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '718cd1aa4e6b4455882fbe4e7616e309'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '71cbc5580c2e49b487f467c917ff52f3'
                        key: {
                            application_file: '10b5437520da4993b0eedbeb8a130970'
                            source_artifact: '22ff7b4d2c0f4893b33781ce94a0560f'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7702e6eab44f44ef8ceba1c18127c6a1'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_method'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '778672194c9c48a89177f7a611ec338a'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_frequency'
                            value: 'daily'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '786dc64e7e194122bf5a55926ef77d15'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'discovery_config'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7eb1cfd38e964fc6b52c4fde40b45c43'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8155d4901e7449c996bc316bb84be855'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                            value: 'date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '825cfa4e961f4de18ebc0794aadbc647'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'is_key_field'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8a7e259b95ad4d2c8f1bcb526ecfbbcd'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'filter_conditions'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8ab56a090c2f4e7d9ab52d260a30a53e'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8b50c17c2438464da8d671c74f506a94'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'next_run'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8ba8abf835764a22883a44140454dcb4'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '8d63f0a1eca649b1ac098d16350afb2e'
                        key: {
                            application_file: '52a07be8bfd34062a1824e6731848f2d'
                            source_artifact: '22ff7b4d2c0f4893b33781ce94a0560f'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8e3976dc37f34d9abcf9d4e877b31380'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'source_table'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9600096b2d984ea58b387b88e8641a3b'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_frequency'
                            value: 'monthly'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '963ca8f1c6564abcb6a896e6c64edd08'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                            value: 'boolean'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '96c4105b7fd94b2c8e8d2d1a8adc6240'
                        key: {
                            name: 'x_1791907_cmdb_dis/main'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9940c4abd54f4f7eb68dc919ee8437cc'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a447265b9fd94ebd84d0c4229410fca3'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'is_key_field'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a5e5712777764036a5a70438092eeaad'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'abe69765c03e40878b3c87d72da14438'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'afd367b3355d44dba12aa2e5778a904d'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'filter_conditions'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b163bce334cd42f8ae03e77b6cfc4c8c'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                            value: 'string'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b2a237f79a48488ea4cf383fff4d2172'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'mandatory'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b856b8aa05f24d60a4b8bd33e49f4b7c'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'target_table'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'baaa273c50a74a5690dc6f447208d14c'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_method'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bee75567da11417796cf4c127c8eb88a'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_script'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c33f9e74874540bfb7191fb33464806b'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'last_run'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c53d39351fe74b2fa5d11aaf15caa77e'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'created_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cc0b7de2f19444e39543b63dd03e20ec'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'records_discovered'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ceb2579154234a4a8c17a13f7ed4ff8f'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4736241c18240a0802e236b2f40577a'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_method'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'd6b5d43eb5fb4f55b89d2f58e732bc5f'
                        key: {
                            application_file: '96c4105b7fd94b2c8e8d2d1a8adc6240'
                            source_artifact: '22ff7b4d2c0f4893b33781ce94a0560f'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'da1adf62b6c64ffeb01610d184e63606'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'next_run'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dc6146881fe841799c84c671f7350447'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_method'
                            value: 'script'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'df23a1b89fbc48cba89445359f591b1d'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'mandatory'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e1fcee6fd556410fb6983110a6f426d4'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_method'
                            value: 'api'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e8efbd1a85104526b309bf64842a4df4'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'sequence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ea504c94b42f47c79cd8183ed46c8c8d'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_frequency'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ec435ef3bdc940d1829ca68bd9df066d'
                        key: {
                            name: 'x_1791907_cmdb_dis_field_mapping'
                            element: 'field_type'
                            value: 'datetime'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ef7cecfe19ef4b0ca6c5576adc8587ac'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'last_run'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ff68c73cd6054184a509b2e254e171e7'
                        key: {
                            name: 'x_1791907_cmdb_dis_discovery_config'
                            element: 'discovery_frequency'
                            value: 'manual'
                        }
                    },
                ]
            }
        }
    }
}

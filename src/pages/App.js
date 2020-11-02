import React, { useState, useEffect } from "react";
import { Container, Header, Form } from "semantic-ui-react";
import axios from "axios";
import Bar from "../components/Bar";
import VmList from "../components/VmList";

import {
  SOs,
  debianDisk,
  debianRam,
  windowsRam,
  windowsDisk,
} from "../commons/constants";

export default function App() {
  const [vms, setVms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currSO, setCurrSO] = useState("");
  const [name, setName] = useState("");
  const [disk, setDisk] = useState("");
  const [ram, setRam] = useState("");



  async function create(vmConfig) {
    try {
      setLoading(true);
      await axios.post("http://localhost:8081/vms/create", vmConfig);
      await getVmsFromApi()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  } 

  async function handleSubmit(e, a) {
    e.preventDefault();
    const newn = name.replace(" ", "_")
    const vmConfig = { name: newn, ram, disk, osType: currSO}
    await create(vmConfig);

  }

  async function getVmsFromApi() {
    try {
      const response = await axios.get("http://localhost:8081/vms/list");
      let i = 0;
      const parsed = response.data.map(vm => {
        i++
        return { name: vm, key: i };
      })
      setVms(parsed);
    } catch (err) {
      console.log(err.data.message);
      return setVms([]);
    }
  }

  useEffect(() => {
    getVmsFromApi();
  }, []);

  async function executeVM(vmName) {
    try {
      await axios.post("http://localhost:8081/vms/start", { name: vmName });
      await getVmsFromApi()
    } catch (err) {
      console.log(err);
    }
  }

  async function cloneVM(vmName) {
    try {
      alert("A Vm está sendo clonada.. Isso pode demorar um pouco. Para mais informações, acesse o arquivo clone.txt")
      await axios.post("http://localhost:8081/vms/clone", { name: vmName });
      await getVmsFromApi()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Container className="page">
        <Bar active="create" />
        <Header as="h2">Vms já criadas</Header>
        <div className="list">
          <VmList items={vms} onExecute={executeVM} onClone={cloneVM} />
        </div>
        <Header style={{ marginTop: 20 }} as="h2">
          Criar uma VM
        </Header>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Form.Input
            required
            width={7}
            onChange={(e, data) => setName(data.value)}
            label="Nome da VM"
            placeholder="Digite um nome"
          />
          <Form.Select
            required
            width={7}
            label="Sistema Operacional"
            placeholder="Selecione um valor"
            onChange={(e, data) => setCurrSO(data.value)}
            options={SOs}
          />
          <Form.Select
            required
            centered
            fluid
            width={7}
            onChange={(e, data) => setRam(data.value)}
            label="Memória Ram"
            placeholder="Selecione um valor"
            options={currSO === "debian" ? debianRam : windowsRam}
          />
          <Form.Select
            required
            width={7}
            label="Disco"
            onChange={(e, data) => setDisk(data.value)}
            placeholder="Selecione um valor"
            options={currSO === "debian" ? debianDisk : windowsDisk}
          />

          <Form.Button loading={loading} primary styles={{ marginTop: 70 }}>
            Criar
          </Form.Button>
        </Form>
      </Container>
    </div>
  );
}
